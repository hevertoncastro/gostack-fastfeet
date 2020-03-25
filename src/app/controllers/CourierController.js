import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll();

    return res.json(couriers);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const courier = await Courier.create({
      name,
      email,
    });

    return res.json(courier);
  }

  async update(req, res) {
    const courier = await Courier.findByPk(req.params.id);

    const { name, email } = await courier.update(req.body);

    return res.json({
      name,
      email,
    });
  }

  async delete(req, res) {
    const courier = await Courier.findByPk(req.params.id).destroy();

    const deleted = await courier;

    return res.status(200).json({
      message: 'Courier successfully deleted.',
    });
  }
}

export default new CourierController();
