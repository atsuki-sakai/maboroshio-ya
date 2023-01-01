import React, { useState } from "react";
import { useUI, useCart, useCustomerState } from "@components/context";
import { AlertDialog, LoadingView } from "@components/ui";
import CartCard from "@components/common/Cart/CartCard";
import { Check, LoadCircle, RightArrow } from "@components/icon";
import { getCheckout, getCheckoutId } from "@shopify/cart";
import { checkoutShippingAddressUpdate } from "@shopify/cart";

import { motion } from "framer-motion";
import type { LineItem } from "@shopify/types/cart";
import { Collection, MailingAddress } from "@shopify/shema";
import { generateApiUrl, normalizeProduct } from "@shopify/utils";
import useSWR from "swr";
import { CollectionSlide, ProductCard } from "@components/product";

const Cart = () => {
  const { isCartOpen, onCartClose } = useUI();
  const { loggedCustomer } = useCustomerState();
  const { cart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmptyCart = cart.lineItems.length === 0;
  const applicableAmount = 10000 - cart.lineItemsSubtotalPrice;

  const cartTotalQuantity = () =>
    cart.lineItems
      .map((item: LineItem) => item.quantity)
      .reduce((sum, element) => sum + element, 0);

  const setupCheckoutShippingAddress = async () => {
    if (loggedCustomer?.defaultAddress) {
      const updateAddress: Partial<MailingAddress> = {
        address1: loggedCustomer.defaultAddress.address1 ?? "",
        address2: loggedCustomer.defaultAddress.address2 ?? "",
        city: loggedCustomer.defaultAddress.city ?? "",
        company: loggedCustomer.defaultAddress.company ?? "",
        country: loggedCustomer.defaultAddress.country ?? "",
        firstName: loggedCustomer.defaultAddress.firstName ?? "",
        lastName: loggedCustomer.defaultAddress.lastName ?? "",
        phone: loggedCustomer.defaultAddress.phone ?? "",
        province: loggedCustomer.defaultAddress.province ?? "",
        zip: loggedCustomer.defaultAddress.zip ?? "",
      };
      await checkoutShippingAddressUpdate(
        getCheckoutId()!,
        updateAddress as MailingAddress
      );
    }
  };

  const womenCollection = "women";
  const menCollection = "men";

  const getCollectionByHandleApiUrl = generateApiUrl({
    type: "GET_COLLECTION_BY_HANDLE",
  });
  const collectionFeacher = async (
    url: string,
    handle: string
  ): Promise<Collection> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        handle: handle,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        throw Error(e.message);
      });
    return response.data.collectionByHandle;
  };
  const { data: collection } = useSWR(
    [getCollectionByHandleApiUrl, womenCollection],
    isEmptyCart ? collectionFeacher : null
  );
  const { data: collection2 } = useSWR(
    [getCollectionByHandleApiUrl, menCollection],
    isEmptyCart ? collectionFeacher : null
  );

  const pushCheckoutWeburl = async () => {
    try {
      setIsLoading(true);
      await setupCheckoutShippingAddress();
      const checkout = await getCheckout(getCheckoutId()!);
      document.location.href = checkout.webUrl;
    } catch (e: any) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0.0 }}
      animate={{
        x: isCartOpen ? "0%" : "100%",
        opacity: isCartOpen ? 1.0 : 0.0,
      }}
      transition={{ duration: "0.6" }}
      className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50"
    >
      {errorMessage ? (
        <AlertDialog
          title="ERROR"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      ) : (
        <></>
      )}
      <div className="w-screen h-screen">
        <div className="grid grid-cols-6 h-full">
          <div
            className={`col-span-1 h-full transition duration-300 ease-in-out ${
              isCartOpen ? "bg-black bg-opacity-50" : ""
            }`}
            onClick={onCartClose}
          />
          <div className="col-span-5 h-full bg-white rounded-tl-md rounded-bl-md p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-sans">お客様のカート</h3>
              <div className="bg-white rounded-md">
                <button
                  className="flex items-center text-gray-800 px-3 py-1"
                  onClick={onCartClose}
                >
                  <span className="text-xs text-blue-700">カートを閉じる</span>
                  <RightArrow className="h-4 w-4 text-blue-700" />
                </button>
              </div>
            </div>
            <div className="mt-5">
              <div className="w-full flex items-center justify-end rounded-md text-center">
                {applicableAmount > 0 ? (
                  <p className="bg-indigo-100 text-xs text-indigo-600 rounded-md px-2 py-0.5">
                    あと
                    <span className="text-base font-bold">
                      ¥{applicableAmount}
                    </span>
                    で<span className="text-sm font-bold">送料無料</span>
                  </p>
                ) : (
                  <div className="bg-green-100 flex items-center space-x-2 px-3 py-1 rounded-md">
                    <Check className="text-green-500 w-5 h-5" />
                    <span className="text-green-500 text-sm font-bold">
                      送料無料
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-7 items-end justify-between mt-2 py-2 px-2 rounded-md shadow-sm bg-gray-100">
                <div className="col-span-4 text-black text-sm font-noto">
                  合計{" "}
                  <span className="font-sans  text-3xl">
                    ¥{Math.floor(cart.lineItemsSubtotalPrice)}
                  </span>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-end text-black">
                    <span className="text-lg font-semibold">
                      {cartTotalQuantity()}
                    </span>{" "}
                    点の商品
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mt-1 flex items-center justify-end">
              {applicableAmount > 0 ? (
                <p className="text-xs text-gray-500">
                  送料は次のステップで計算されます
                </p>
              ) : (
                <></>
              )}
            </div>
            <button
              className="flex justify-center mt-6 w-full bg-gradient-to-tr to-green-500 from-lime-400 py-2 rounded-md shadow-sm"
              onClick={pushCheckoutWeburl}
              disabled={isEmptyCart || isLoading}
            >
              <div className="flex items-center justify-between">
                <p className="text-white text-base font-bold text-center tracking-wider">
                  {isEmptyCart
                    ? "カートは空です"
                    : isLoading
                    ? "決済処理中"
                    : "商品を購入する"}
                </p>
                <motion.div
                  className="ml-2 -translate-y-1.5"
                  initial={{ opacity: 0, height: 12, width: 0 }}
                  animate={{
                    opacity: isLoading ? 1 : 0,
                    height: 12,
                    width: isLoading ? 12 : 0,
                  }}
                >
                  <LoadCircle className="text-white h-6 w-6 animate-spin" />
                </motion.div>
              </div>
            </button>
            <div className="overflow-y-auto my-5 p-1">
              {isEmptyCart ? (
                <div className="px-3 py-1 bg-gray-100 rounded-md shadow-sm">
                  <div className="pt-3 text-center">
                    <p className="text-sm text-start font-bold mb-3">
                      こちらの商品に
                      <br />
                      興味はありませんか？
                    </p>
                    {collection ? (
                      <CollectionSlide collection={collection} />
                    ) : null}
                  </div>
                  <div className="pt-16 text-center">
                    <p className="text-sm text-start font-bold mb-3">
                      この商品はよく売れています。
                    </p>
                    {collection2 ? (
                      <CollectionSlide collection={collection2} />
                    ) : null}
                  </div>
                </div>
              ) : (
                cart.lineItems.map((item: LineItem) => {
                  return <CartCard key={item.id} item={item} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
