from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer, Order, Product, OrderProduct
from .serializers import (
    CustomerSerializer,
    ProductSerializer,
    OrderSerializer,
    OrderWriteSerializer,
    OrderProductSerializer,
    OrderProductWriteSerializer,
)


def _update_delete_by_id(viewset, request, pk_field, partial=False):
    """Shared logic: get id from body, get object, then update or delete."""
    pk = request.data.get(pk_field)
    if pk is None:
        return Response(
            {pk_field: ['This field is required.']},
            status=status.HTTP_400_BAD_REQUEST,
        )
    queryset = viewset.get_queryset()
    try:
        obj = queryset.get(**{pk_field: pk})
    except queryset.model.DoesNotExist:
        return Response(
            {'detail': 'Not found.'},
            status=status.HTTP_404_NOT_FOUND,
        )
    if request.method == 'DELETE':
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = viewset.get_serializer(obj, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    @action(detail=False, methods=['get', 'put', 'patch', 'delete'], url_path='by-id')
    def by_id(self, request):
        if request.method == 'GET':
            return Response({
                'detail': 'Send PUT (full update), PATCH (partial update), or DELETE with the resource id in the request body.',
                'example_body': {'customer_id': 1},
                'allowed_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            })
        if request.method == 'DELETE':
            return _update_delete_by_id(self, request, 'customer_id', partial=False)
        partial = request.method == 'PATCH'
        return _update_delete_by_id(self, request, 'customer_id', partial=partial)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get', 'put', 'patch', 'delete'], url_path='by-id')
    def by_id(self, request):
        if request.method == 'GET':
            return Response({
                'detail': 'Send PUT (full update), PATCH (partial update), or DELETE with the resource id in the request body.',
                'example_body': {'product_id': 1},
                'allowed_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            })
        if request.method == 'DELETE':
            return _update_delete_by_id(self, request, 'product_id', partial=False)
        partial = request.method == 'PATCH'
        return _update_delete_by_id(self, request, 'product_id', partial=partial)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related('order_products__product').select_related('customer')

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update', 'by_id'):
            return OrderWriteSerializer
        return OrderSerializer

    @action(detail=False, methods=['get', 'put', 'patch', 'delete'], url_path='by-id')
    def by_id(self, request):
        if request.method == 'GET':
            return Response({
                'detail': 'Send PUT (full update), PATCH (partial update), or DELETE with the resource id in the request body.',
                'example_body': {'order_id': 1},
                'allowed_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            })
        if request.method == 'DELETE':
            return _update_delete_by_id(self, request, 'order_id', partial=False)
        partial = request.method == 'PATCH'
        return _update_delete_by_id(self, request, 'order_id', partial=partial)


class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.select_related('order', 'product')

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update', 'by_id'):
            return OrderProductWriteSerializer
        return OrderProductSerializer

    @action(detail=False, methods=['get', 'put', 'patch', 'delete'], url_path='by-id')
    def by_id(self, request):
        if request.method == 'GET':
            return Response({
                'detail': 'Send PUT (full update), PATCH (partial update), or DELETE with the resource id in the request body.',
                'example_body': {'orderproduct_id': 1},
                'allowed_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            })
        if request.method == 'DELETE':
            return _update_delete_by_id(self, request, 'orderproduct_id', partial=False)
        partial = request.method == 'PATCH'
        return _update_delete_by_id(self, request, 'orderproduct_id', partial=partial)
