import { ReactComponent as BuyIcon } from '../../assets/buy-icon.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove-icon.svg';
import { buyProduct } from "../../services/product-service";
import { removeProduct } from "../../services/product-service";
import { toast } from 'react-toastify'

function ShoppingCartItem(props) {
  const { name, cost, imgUrl, isBought, _id, setRefreshProducts } = props;
  const inlineStyle = () => {
      return { textDecoration: isBought ? 'line-through' : 'none' } // if isBought 'line-through' else 'none'
  }
  const handleBuyItem = () => {
      buyProduct(_id)
      .then(() => {
         setRefreshProducts({});
         toast(`Bought ${name}!`, {type: 'info', autoClose: 1000 });
      })
      .catch(() => {
         toast('Something went wrong!', {type: 'error', autoClose: 1000 });
      })
  }
  const handleRemoveItem = () => {
      removeProduct(_id)
      .then(() => {
        setRefreshProducts({});
        toast(`Deleted ${name}!`, {type: 'warning', autoClose: 1000 });
   })
   .catch(() => {
      toast('Something went wrong!', {type: 'error', autoClose: 1000 });
   })
  }

  return (
    //   <article className="shopping-cart__item-container" style="text-decoration: none;">
    <article style={inlineStyle()} className="shopping-cart__item-container">
      <img className="shopping-cart__item-img" src={imgUrl} alt="Item image" />
      <p className="shopping-cart__item-name">{name}</p>
      <p className="shopping-cart__item-cost">{cost.toFixed(2)}$</p>
      <div className="shopping-cart__item-actions">
        {
           !isBought&& (
            <button onClick = {handleBuyItem} className="shopping-cart__item--buy-btn">
            <span>Buy</span>
            <BuyIcon />
          </button>
           )
        }
        <button onClick={handleRemoveItem} className="shopping-cart__item--remove-btn">
          <span>Remove</span>
          <RemoveIcon />
        </button>
      </div>
    </article>
  );
}

export default ShoppingCartItem;
