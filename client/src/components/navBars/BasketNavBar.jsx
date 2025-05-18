import { CreditCard, Truck, Package } from "lucide-react";
import { BASKET_URL } from "../../constant/urls";
import { apiGet, apiPost, apiPut, apiDelete } from "../../services/apiRequest";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";

export default function CheckoutPage() {
  const { user } = useContext(UserContext);
  const [mockItems, setMockItems] = useState([]);
  const [error, setError] = useState(null);

  const total = mockItems
    ?.map((item) => item.itemDetails.price * item.quantity) // Map to get an array of costs
    .reduce((sum, current) => sum + current, 0); // Reduce to sum up the costs

  // שליפת המוצרים בסל
  useEffect(() => {
    const getBasketItems = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("asp_user_details"));
        const { data } = await apiGet(BASKET_URL + "/" + userDetails.user.id);
        setMockItems(data);
      } catch (error) {
        setError("Failed to load basket items");
        console.log(error);
      }
    };
    getBasketItems();
  }, []);

  // פונקציה להוספת מוצר לסל
  const addToBasket = async (productId) => {
    try {
      await apiPost(BASKET_URL, {
        user_id: user.user.id,
        productId: productId,
      });

      // ריענון הסל לאחר הוספה
      const { data } = await apiGet(BASKET_URL + "/" + user.user.id);
      setMockItems(data); // עדכון הסטייט של הסל

    } catch (error) {
      console.log("Error adding to basket:", error);
    }
  };

  // פונקציה להפחית כמות מוצר ב-1
  const decreaseQuantity = async (productId) => {
    try {
      const url = `${BASKET_URL}/user/${user.user.id}/product/${productId}`;
      await apiPut(url, { action: "decrease" });
  
      const { data } = await apiGet(`${BASKET_URL}/${user.user.id}`);
      setMockItems(data); // עדכון הסל אחרי ההפחתה או המחיקה
    } catch (error) {
      console.log("Error decreasing quantity:", error);
    }
  };
  

  // פונקציה למחוק מוצר מהסל
  const removeItem = async (productId) => {
    try {
      // בונים URL עם userId ו-productId לפי הנתיב בשרת
      const url = `${BASKET_URL}/user/${user.user.id}/product/${productId}`;
      
      await apiDelete(url);
      
      // עדכון הסל לאחר ההסרה
      const { data } = await apiGet(`${BASKET_URL}/${user.user.id}`);
      setMockItems(data);
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container p-3" style={{ marginTop: "60px" }}>
      <div>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h4 mb-4 fw-bold d-flex justify-content-center">
              Order Summary
            </h2>
            <div className="space-y-3">
              {mockItems?.map((item) => (
                <div key={item._id} className="container d-flex align-items-center mb-3 row">
                  {/* תמונת מוצר */}
                  <hr />
                  <div className="col-2">
                    <img
                      src={item.itemDetails.image_url}
                      alt={item.itemDetails.name}
                      className="rounded me-3"
                      width="64"
                      height="64"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* פרטי המוצר */}
                  <div className="flex-grow-1 col-2">
                    <div className="fw-medium">{item.itemDetails.name}</div>
                    <div className="small text-danger">
                      Quantity: {item.quantity}
                    </div>
                  </div>

                  {/* מחיר המוצר */}
                  <div className="flex-grow-1 col-2">
                    <div className="fw-medium">
                      Price: ${item.itemDetails.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="fw-semibold col-3">
                    Sum: ${(item.itemDetails.price * item.quantity).toFixed(2)}
                  </div>

                  {/* כפתור הוספה */}
                  <div className="col-1">
                    <button
                      style={{ backgroundColor: "green" }}
                      onClick={() => addToBasket(item._id)}
                    >
                      +
                    </button>
                  </div>

                  {/* כפתור הפחתת כמות */}
                  <div className="col-1">
                    <button
                      style={{ backgroundColor: "orange" }}
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                  </div>

                  {/* כפתור מחיקת מוצר */}
                  <div className="col-1">
                    <button
                      className="bg-danger text-white"
                      onClick={() => removeItem(item._id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>{total}</span>
              </div>
              <div className="d-flex justify-content-between text-success">
                <span>Shipping</span>
                <span>30$</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>{total + 30}</span>
              </div>
            </div>
            <button className="btn btn-warning w-100 mt-4 fw-semibold">
              Place Order
            </button>

            <div className="mt-4 text-muted small">
              <div className="d-flex align-items-center mb-2">
                <Truck className="me-2" size={16} />
                Free shipping on all orders
              </div>
              <div className="d-flex align-items-center">
                <Package className="me-2" size={16} />
                30-day easy returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
