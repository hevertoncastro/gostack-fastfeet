import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string()
        .required()
        .length(8),
      address: Yup.string().required(),
      number: Yup.string().when('noNumber', (noNumber, field) =>
        !noNumber ? field.required() : field
      ),
      complement: Yup.string(),
      state_code: Yup.string()
        .required()
        .length(2),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      name,
      zipcode,
      address,
      number,
      complement,
      state_code,
      state_name,
      city,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      zipcode,
      address,
      number,
      complement,
      state_code,
      state_name,
      city,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string()
        .required()
        .length(8),
      address: Yup.string().required(),
      number: Yup.string().when('noNumber', (noNumber, field) =>
        !noNumber ? field.required() : field
      ),
      complement: Yup.string(),
      state_code: Yup.string()
        .required()
        .length(2),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    const {
      name,
      zipcode,
      address,
      number,
      complement,
      state_code,
      state_name,
      city,
    } = await recipient.update(req.body);

    return res.json({
      name,
      zipcode,
      address,
      number,
      complement,
      state_code,
      state_name,
      city,
    });
  }
}

export default new RecipientController();
