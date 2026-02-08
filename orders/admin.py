from django.contrib import admin
from .models import Customer, Order, Product, OrderProduct


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'name')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_id', 'product_name', 'price')


class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'order_date', 'customer')
    inlines = [OrderProductInline]


@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('orderproduct_id', 'order', 'product', 'quantity')
