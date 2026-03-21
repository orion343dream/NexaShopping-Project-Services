module.exports = {
  apps : [
    {
      name   : "cloud-sql-auth-proxy",
      script : "./cloud-sql-proxy silent-bird-489817-g0:asia-southeast1:mysql-vm silent-bird-489817-g0:asia-southeast1:postgres-vm --private-ip",
      log_file: "./logs/cloud-sql-auth-proxy-out.log",
    },
    {
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
