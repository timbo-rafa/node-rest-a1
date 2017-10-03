#/bin/bash
set -e
#set -x

DOMAIN="localhost:8000"
PRODUCT_URL="$DOMAIN/products"

#PENCIL="name=Pencil&price=0.20"
PEN="name=Pen&price=1.00&quantity=999995"
TOSTITOS="name=Tostitos&price=2.57&quantity=5000"
FROZEN_PIZZA="name=Pizza&price=4.22"
YOGURT="name=Yogurt&price=4.00&quantity=100"

echo "Pinging server..."
curl $DOMAIN
read

echo "Listing products:"
curl $PRODUCT_URL
read

echo "Posting products:"
curl --data $PEN          $PRODUCT_URL
sleep 1s
curl --data $TOSTITOS     $PRODUCT_URL
sleep 1s
curl --data $YOGURT       $PRODUCT_URL
sleep 1s
curl --data $FROZEN_PIZZA $PRODUCT_URL
read

echo "Listing products:"
curl $PRODUCT_URL

echo "Deleting product id=2:"
curl -X DELETE $PRODUCT_URL/2
read

echo "Listing products:"
curl $PRODUCT_URL
read

echo "Getting deleted product id=2:"
curl $PRODUCT_URL/2
read

echo "Getting product id=1:"
curl $PRODUCT_URL/1
read

echo "Updating product id=1:"
curl -X PUT --data "price=0.10" $PRODUCT_URL/1
read

echo "Getting product id=1:"
curl $PRODUCT_URL/1
read

echo "Updating non-existent product id=999999:"
curl -X PUT --data "price=1000.0" $PRODUCT_URL/999999
read

echo "Deleting ALL products:"
curl -X DELETE $PRODUCT_URL
read

echo "Listing products:"
curl $PRODUCT_URL
read
