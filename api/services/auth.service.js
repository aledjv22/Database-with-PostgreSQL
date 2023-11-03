const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UsersService = require('./user.service');

const service = new UsersService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    
    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token
    };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail({
      from: `"Foo Boo 👻" <${config.emailSender}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'example', // Subject line
      text: 'Hello example', // plain text body
      html: '<b>Hello example</b>', // html body
    });

    return { message: 'mail sent'};
  }
}

module.exports = AuthService;