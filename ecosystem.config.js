module.exports = {
  apps : [{
    name   : "user-service",
    script : "java -jar ./user-service/target/User-Service-1.0.0.jar",
    instances : 2,
    log    : "./logs/user-service.log",
    error  : "./logs/user-service-error.log"
  },

  {
    name   : "item-service",
    script : "java -jar ./item-service/target/Item-Service-1.0.0.jar",
    instances : 2,
    log    : "./logs/item-service.log",
    error  : "./logs/item-service-error.log"
  },

  {
    name   : "order-service",
    script : "java -jar ./order-service/target/Order-Service-1.0.0.jar",
    instances : 2,
    log    : "./logs/order-service.log",
    error  : "./logs/order-service-error.log"
  }

  ]
}
