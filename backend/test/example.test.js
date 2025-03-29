import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Order from '../models/Order'; // Your Order model
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/orderController'; // Controllers

chai.use(chaiHttp);

describe('Order CRUD Operations', () => {
  
  describe('Create Order', () => {
    it('should create a new order successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { items: ["item1", "item2"], totalAmount: 50, status: "Pending" }
      };

      const createdOrder = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };

      const createStub = sinon.stub(Order, 'create').resolves(createdOrder);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await createOrder(req, res);

      expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdOrder)).to.be.true;

      createStub.restore();
    });

    it('should return 500 if an error occurs', async () => {
      const createStub = sinon.stub(Order, 'create').throws(new Error('DB Error'));

      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { items: ["item1", "item2"], totalAmount: 50, status: "Pending" }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await createOrder(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      createStub.restore();
    });
  });

  describe('Get Orders', () => {
    it('should return orders for the given user', async () => {
      const userId = new mongoose.Types.ObjectId();
      const orders = [
        { _id: new mongoose.Types.ObjectId(), items: ["item1"], totalAmount: 30, status: "Pending", userId },
        { _id: new mongoose.Types.ObjectId(), items: ["item2"], totalAmount: 40, status: "Completed", userId }
      ];

      const findStub = sinon.stub(Order, 'find').resolves(orders);

      const req = { user: { id: userId } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await getOrders(req, res);

      expect(findStub.calledOnceWith({ userId })).to.be.true;
      expect(res.json.calledWith(orders)).to.be.true;

      findStub.restore();
    });
  });

  describe('Update Order', () => {
    it('should update an order successfully', async () => {
      const orderId = new mongoose.Types.ObjectId();
      const existingOrder = {
        _id: orderId,
        items: ["item1"],
        totalAmount: 30,
        status: "Pending",
        save: sinon.stub().resolvesThis()
      };

      const findByIdStub = sinon.stub(Order, 'findById').resolves(existingOrder);

      const req = {
        params: { id: orderId },
        body: { status: "Completed" }
      };

      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await updateOrder(req, res);

      expect(existingOrder.status).to.equal("Completed");
      expect(res.status.called).to.be.false;
      expect(res.json.calledOnce).to.be.true;

      findByIdStub.restore();
    });

    it('should return 404 if order not found', async () => {
      const findByIdStub = sinon.stub(Order, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await updateOrder(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Order not found' })).to.be.true;

      findByIdStub.restore();
    });
  });

  describe('Delete Order', () => {
    it('should delete an order successfully', async () => {
      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const order = { remove: sinon.stub().resolves() };

      const findByIdStub = sinon.stub(Order, 'findById').resolves(order);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteOrder(req, res);

      expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
      expect(order.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Order deleted' })).to.be.true;

      findByIdStub.restore();
    });

    it('should return 404 if order not found', async () => {
      const findByIdStub = sinon.stub(Order, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteOrder(req, res);

      expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Order not found' })).to.be.true;

      findByIdStub.restore();
    });
  });

});
