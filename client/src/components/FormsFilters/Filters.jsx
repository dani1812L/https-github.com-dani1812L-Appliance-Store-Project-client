import React, { useEffect, useState, useContext } from "react";
import StoreContext from "../Context/StoreContext";
import axios from "axios";
import { BASKET_URL, INSTRUMENTS_URL } from "../../constant/urls";
import UserContext from "../Context/UserContext";
import Button from "../button/Button";
import { apiPost, apiGet } from "../../services/apiRequest";

const Filters = ({ filterCategory }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [messageProductId, setMessageProductId] = useState(null); // הצגת הודעה לפי מוצר

  const { search, range, basket, setBasket } = useContext(StoreContext);
  const { user } = useContext(UserContext);

  // שליפת כל המוצרים
  useEffect(() => {
    axios
      .get(INSTRUMENTS_URL)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // סינון מוצרים
  useEffect(() => {
    const res = items.filter((item) => {
      const nameFilter =
        !search?.trim() ||
        item.name.toLowerCase().includes(search.trim().toLowerCase());

      const rangeFilter =
        range?.minPrice !== undefined && range?.maxPrice !== undefined
          ? item.price >= range.minPrice && item.price <= range.maxPrice
          : true;

      const categoryFilter =
        filterCategory === "all" || item.category === filterCategory;

      return categoryFilter && nameFilter && rangeFilter;
    });

    setFilteredItems(res);
  }, [search, range, filterCategory]);

  // הצגת ההודעה ל-5 שניות
  const triggerSuccessMessage = (productId) => {
    setMessageProductId(productId);
    setTimeout(() => {
      setMessageProductId(null);
    }, 5000 );
  };

  // שליפת כמות מוצר מהסל לפי מזהה
  const getQuantityInBasket = (productId) => {
    const item = basket?.find(
      (b) => b.itemDetails?._id === productId || b._id === productId
    );
    return item?.quantity || 1;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="bg-info p-4"
      style={{ marginTop: "50px", minHeight: "100vh" }}
    >
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="item-card border border-dark rounded p-4 bg-white"
            style={{ width: "270px" }}
          >
            <div>
              <img
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
                src={item.image_url}
                alt={item.name}
                className="img-fluid"
              />
            </div>
            <hr />
            <h6 style={{ backgroundColor: "yellow" }}>{item.name}</h6>
            <p>{item.description}</p>
            <hr />
            <div className="row d-flex justify-content-center">
              <p className="col-6 d-flex justify-content-center">
                <strong>Price: ${item.price}</strong>
              </p>

              {user.auth ? (
                <div className="col-12 text-center">
                  <Button
                    handleClick={async () => {
                      try {
                        await apiPost(BASKET_URL, {
                          user_id: user.user.id,
                          productId: item._id,
                        });

                        // ריענון סל הקניות מהשרת
                        const { data } = await apiGet(
                          BASKET_URL + "/" + user.user.id
                        );
                        setBasket(data);

                        // הצגת הודעה
                        triggerSuccessMessage(item._id);
                      } catch (err) {
                        console.error("שגיאה בהוספת מוצר לסל", err);
                      }
                    }}
                  >
                    Add to shopping cart
                  </Button>

                  {messageProductId === item._id && (
                    <div
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #c3e6cb",
                        fontSize: "0.9rem",
                      }}
                    >
                      ✅ המוצר נוסף בהצלחה! יש לך כעת{" "}
                      {getQuantityInBasket(item._id)} כאלה בסל.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
