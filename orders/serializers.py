from rest_framework import serializers
from .models import Customer, Order, Product, OrderProduct


class CustomerSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='customer-detail')

    class Meta:
        model = Customer
        fields = ['url', 'customer_id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='product-detail')

    class Meta:
        model = Product
        fields = ['url', 'product_id', 'product_name', 'price']


class OrderProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='orderproduct-detail')
    product_name = serializers.CharField(source='product.product_name', read_only=True)

    class Meta:
        model = OrderProduct
        fields = ['url', 'orderproduct_id', 'order', 'product', 'product_name', 'quantity']


class OrderProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ['orderproduct_id', 'order', 'product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='order-detail')
    order_products = OrderProductSerializer(many=True, read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Order
        fields = ['url', 'order_id', 'order_date', 'customer', 'customer_name', 'order_products']


class OrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'order_date', 'customer']
