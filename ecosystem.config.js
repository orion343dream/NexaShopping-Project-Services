module.exports = {
  apps : [
    {
  name   : "cloud-sql-auth-proxy",
  script : "./cloud-sql-proxy",
  args   : "--address 0.0.0.0 nexashopping-enterprise:asia-southeast1:mysql-vm?port=3306 nexashopping-enterprise:asia-southeast1:postgres-vm?port=5432",
    },
    {
      name      : "user-service",
      script    : "java",
      args      : "-Xmx256m -jar ./user-service/target/User-Service-1.0.0.jar",
      instances : 2,
      log       : "./logs/user-service.log",
      error     : "./logs/user-service-error.log"
    },
    {
      name      : "item-service",
      script    : "java",
      args      : "-Xmx256m -jar ./item-service/target/Item-Service-1.0.0.jar",
      instances : 2,
      log       : "./logs/item-service.log",
      error     : "./logs/item-service-error.log"
    },
    {
      name      : "order-service",
      script    : "java",
      args      : "-Xmx256m -jar ./order-service/target/Order-Service-1.0.0.jar",
      instances : 2,
      log       : "./logs/order-service.log",
      error     : "./logs/order-service-error.log"
    }
  ]
}
