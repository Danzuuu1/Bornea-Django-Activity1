from django.db import models


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'customer'
        ordering = ['customer_id']

    def __str__(self):
        return self.name


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'product'
        ordering = ['product_id']

    def __str__(self):
        return self.product_name


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateField()
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='orders',
        db_column='customer_id',
    )

    class Meta:
        db_table = 'order'
        ordering = ['-order_date', 'order_id']

    def __str__(self):
        return f"Order {self.order_id} ({self.order_date})"


class OrderProduct(models.Model):
    orderproduct_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='order_products',
        db_column='order_id',
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='order_products',
        db_column='product_id',
    )
    quantity = models.IntegerField()

    class Meta:
        db_table = 'order_product'
        ordering = ['orderproduct_id']
        unique_together = [['order', 'product']]

    def __str__(self):
        return f"Order {self.order_id} x {self.product.product_name} x {self.quantity}"
