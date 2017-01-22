"use strict";

const mongoose = require('mongoose');

let OrderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dish: {
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    },
    status: {
        type: "String",
        enum: ["Заказано", "Готовится", "Доставляется", "Возникли сложности", "Подано"]
    }
});

module.exports = mongoose.model('Order', OrderSchema);