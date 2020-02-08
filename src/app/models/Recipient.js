import Sequelize, { Model } from 'sequelize';
import brazilianStates from '../../config/brazilianStates';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        noNumber: Sequelize.VIRTUAL,
        complement: Sequelize.STRING,
        state_code: Sequelize.STRING,
        state_name: Sequelize.STRING,
        city: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async recipient => {
      if (recipient.state_code) {
        recipient.state_name = brazilianStates[recipient.state_code];
      }
    });

    return this;
  }
}

export default Recipient;
