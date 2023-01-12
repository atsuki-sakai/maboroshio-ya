import React, { useState } from "react";
import Link from "next/link";
import { useCustomerState, useUI } from "@components/context";
import { motion } from "framer-motion";
import style from "./Drawer.module.css";
import LeftArrow from "@components/icon/LeftArrow";
import Search from "@components/icon/Search";
import useSWR from "swr";
import { generateApiUrl } from "@shopify/utils";
import { Collection } from "@shopify/shema";
import { ChevronDown, Close, Menu, Person, Trash } from "@components/icon";
import { getProductTags, getProductTypes } from "@shopify/products";
import { useRouter } from "next/router";
import { truncate } from "@lib/truncate";

const Drawer = () => {
  const { isDrawerOpen, onDrawerClose } = useUI();
  const router = useRouter();
  const { loggedCustomer } = useCustomerState();
  const [showDetailSearch, setShowDetailSearch] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [showType, setShowType] = useState(false);
  const getAllCollectionsApiUrl = generateApiUrl({
    type: "GET_ALL_COLLECTIONS",
  });
  const collectionsFeacher = async (url: string): Promise<Collection[]> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        limit: 6,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        throw Error(e.message);
      });
    return response.data.collections.edges.map((edge: any) => edge.node);
  };
  const { data: collections } = useSWR(
    getAllCollectionsApiUrl,
    collectionsFeacher
  );

  const [searchText, setSearchText] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [productTag, setProductTag] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>();

  const getTagsApiUrl = generateApiUrl({ type: "GET_PRODUCT_TAGS" });
  const getTypesApiUrl = generateApiUrl({ type: "GET_PRODUCT_TYPES" });
  const { data: tags } = useSWR(getTagsApiUrl, getProductTags);
  const { data: types } = useSWR(getTypesApiUrl, getProductTypes);

  const wordsToQuery = (words: string[], onlyTitle: boolean = false) => {
    const queryList = words.map((word, index) => {
      if (index === 0) {
        return `(${onlyTitle ? `title:${word}*` : `${word}*`})`;
      } else {
        return ` OR (${onlyTitle ? `title:${word}*` : `${word}*`})`;
      }
    });

    return queryList.length !== 0
      ? queryList.reduce((sum, value) => (sum += value))
      : "";
  };

  const detailSearch = async () => {
    let graphQuery = "";
    const words = searchText.split(/(\s+)/).filter((e) => e.trim().length > 0);

    graphQuery = wordsToQuery(words);

    if (priceRange && parseInt(priceRange) >= 1000) {
      if (graphQuery === "") {
        graphQuery += `(variants.price:<${parseInt(priceRange)})`;
      } else {
        graphQuery += ` AND (variants.price:<${parseInt(priceRange)})`;
      }
    }
    if (productType) {
      if (graphQuery === "") {
        graphQuery += `(product_type:${productType})`;
      } else {
        graphQuery += ` AND (product_type:${productType})`;
      }
    }
    if (productTag) {
      if (graphQuery === "") {
        graphQuery += `(tag:${productTag})`;
      } else {
        graphQuery += ` AND (product_type:${productTag})`;
      }
    }
    setPriceRange("");
    setSearchText("");
    setProductTag("");
    setProductType("");
    router.push({
      pathname: `/products/search/query/${graphQuery}`,
      query: {
        graphQuery: graphQuery,
        categoryName: `${searchText && `${searchText}`}${
          priceRange && priceRange !== "0" ? ` / ${priceRange}円以下` : ``
        }${productType && ` / ${productType}`} ${
          productTag && ` / ${productTag}`
        }`,
      },
    });
    onDrawerClose();
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0.0 }}
      animate={{
        x: isDrawerOpen ? "0%" : "-100%",
        opacity: isDrawerOpen ? 1.0 : 0.0,
      }}
      transition={{ duration: "0.6" }}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto"
    >
      <div className={style.root}>
        <div className="grid grid-cols-6 h-full font-sans">
          <div className="col-span-5 bg-white rounded-tr-md rounded-br-md h-full  py-5 relative p-4">
            <div className="flex items-center justify-between">
              <div className="bg-white rounded-md" onClick={onDrawerClose}>
                <div className="flex items-center text-blue-700 ">
                  <LeftArrow className="h-4 w-4" />
                  <span className="text-sm">メニューを閉じる</span>
                </div>
              </div>
            </div>
            <div className="my-3 text-sm font-sans">
              <div className="flex items-center w-full pt-3">
                <input
                  id="search"
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="商品キーワードで検索"
                  className="bg-gray-50 border shadow-sm  h-10 rounded-md px-3 py-1 text-[17px] scale-95 -translate-x-1.5 w-full focus:outline-none tracking-wide"
                />
                <Link
                  as={`/products/search/${searchText}`}
                  href={{
                    pathname: `/products/search/[text]`,
                    query: { titleOnly: false, text: searchText },
                  }}
                  passHref
                >
                  <a>
                    <div
                      className="w-10 h-10 bg-gray-600 ml-2 flex justify-center rounded-md items-center shadow-md"
                      onClick={onDrawerClose}
                    >
                      <Search className="text-white h-6 w-6" />
                    </div>
                  </a>
                </Link>
              </div>

              <button
                className="text-sm text-blue-600 flex justify-between w-full items-center mt-5 px-3 py-1 bg-blue-100 rounded-md shadow-sm"
                onClick={() => setShowDetailSearch(!showDetailSearch)}
              >
                <p>{showDetailSearch ? "閉じる" : "商品を詳しく絞り込む"}</p>
                {showDetailSearch ? (
                  <Close className="h-5 w-5 text-blue-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-600" />
                )}
              </button>

              <div
                className={`${
                  showDetailSearch
                    ? "border p-3 rounded-xl shadow-md mb-8 mt-6"
                    : "hidden"
                }`}
              >
                <p className="text-base font-bold">価格帯</p>
                <p className="text-sm mt-2">
                  <span
                    className={` ${
                      priceRange ? "text-lg font-bold" : "text-sm text-gray-500"
                    }`}
                  >
                    {priceRange ? `${priceRange}円` : `指定無し`}
                  </span>
                  {priceRange ? "以下の商品" : ""}
                </p>
                <div className="w-full my-2">
                  <input
                    className="w-full"
                    value={priceRange ?? 0}
                    type="range"
                    id="price-range"
                    name="price-range"
                    min={1000}
                    max={10000}
                    step={1000}
                    color="green"
                    onInput={(e: any) => setPriceRange(e.target.value)}
                  />
                  <label htmlFor="price-range" className="hidden">
                    価格帯
                  </label>
                </div>
                <p className="text-base font-bold pt-3">商品カテゴリ</p>
                <div className="grid grid-cols-2 gap-3 text-base py-4">
                  {types && types.length !== 0 ? (
                    types.map((type, index) => {
                      return (
                        <button
                          key={index}
                          className={`text-start transform duration-300 ease-in-out ${
                            type.node === productType
                              ? "text-green-600 font-bold"
                              : "text-gray-500 scale-95"
                          }`}
                          onClick={() =>
                            setProductType(
                              productType === type.node ? "" : type.node
                            )
                          }
                        >
                          <p className={``}>{type.node}</p>
                        </button>
                      );
                    })
                  ) : (
                    <div className="whitespace-nowrap text-gray-500">
                      商品カテゴリはありません
                    </div>
                  )}
                </div>
                <p className="text-base font-bold pt-3">商品タグ</p>
                <div className="grid grid-flow-row-dense grid-cols-2 grid-row-3 gap-5 text-base py-2">
                  {tags && tags.length !== 0 ? (
                    tags.map((tag, index) => {
                      return (
                        <button
                          key={index}
                          className={`text-center transform duration-300 ease-out ${
                            tag.node === productTag
                              ? "bg-green-100 border border-green-600 text-green-600 font-bold"
                              : "bg-gray-100 border text-gray-400 scale-95"
                          } rounded-sm shadow-md py-2 px-1`}
                          onClick={() =>
                            setProductTag(
                              productTag === tag.node ? "" : tag.node
                            )
                          }
                        >
                          <p>{tag.node}</p>
                        </button>
                      );
                    })
                  ) : (
                    <div className="whitespace-nowrap text-gray-500">
                      商品タグはありません
                    </div>
                  )}
                </div>

                <div className="w-full pt-6 flex justify-center">
                  <button
                    className={`text-white text-base w-fit px-3 py-1 rounded-md shadow-md ${
                      !productTag && !productType && !searchText && !priceRange
                        ? "bg-gray-500"
                        : "bg-blue-600"
                    }`}
                    onClick={detailSearch}
                    disabled={
                      !productTag && !productType && !searchText && !priceRange
                    }
                  >
                    {!productTag && !productType && !searchText && !priceRange
                      ? "商品を絞り込んで下さい"
                      : "上記の条件で検索"}
                  </button>
                </div>
              </div>
              <div className="h-full w-full space-y-3 mt-6 bg-gradient-to-tr from-green-500 to-lime-400 text-white text-lg p-3 rounded-xl shadow-lg">
                <div onClick={onDrawerClose}>
                  <Link
                    href={` ${
                      loggedCustomer ? "/customer/my-page" : "/customer/login"
                    } `}
                    passHref
                  >
                    <a>
                      <div className="flex items-center">
                        <Person />
                        <p className="pl-1">
                          {loggedCustomer ? "マイページ" : "会員登録"}
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
                <div onClick={onDrawerClose}>
                  <Link href={`/`} passHref>
                    <a>
                      <div className="flex items-center">
                        <Trash />
                        <p className="pl-1">まぼろし屋について</p>
                      </div>
                    </a>
                  </Link>
                </div>
                <div onClick={onDrawerClose}>
                  <Link href={`/`} passHref>
                    <a>
                      <div className="flex items-center">
                        <Menu />
                        <p className="pl-1">ご利用ガイド</p>
                      </div>
                    </a>
                  </Link>
                </div>
                <div onClick={onDrawerClose}>
                  <Link href={`/`} passHref>
                    <a>
                      <div className="flex items-center">
                        <Search />
                        <p className="pl-1">レシピ特集</p>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-8">
                <div className="bg-gray-300 h-[1px] w-full mx-auto"></div>
              </div>
              <div className="py-1">
                <button
                  className="w-full focus:outline-none active:outline-none px-3 py-1"
                  onClick={() => setShowCollections(!showCollections)}
                >
                  {showCollections ? (
                    <div className="flex items-center justify-between">
                      <p className="text-base">閉じる</p>
                      <Close className="h-7 w-7" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-base">商品コレクション</p>
                      <ChevronDown className="h-7 w-7" />
                    </div>
                  )}
                </button>
                <div
                  className={`${
                    showCollections ? "" : "hidden"
                  } grid grid-cols-1 space-y-1.5 mt-4 text-xs mb-3 px-3`}
                >
                  {collections &&
                    collections.map((collection, index) => {
                      return (
                        <div key={index} onClick={onDrawerClose}>
                          <Link
                            href={`/products/collection/${collection.handle}`}
                            passHref
                          >
                            <a>
                              <p className="font-bold text-base ">
                                {collection.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {truncate(collection.description, 20)}
                              </p>
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="">
                <div className="bg-gray-300 h-[1px] w-full mx-auto"></div>
              </div>

              <div className="py-1">
                <button
                  className="w-full focus:outline-none active:outline-none px-3 py-1"
                  onClick={() => setShowTag(!showTag)}
                >
                  {showTag ? (
                    <div className="flex items-center justify-between">
                      <p className="text-base">閉じる</p>
                      <Close className="h-7 w-7" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-base">商品タグ</p>
                      <ChevronDown className="h-7 w-7" />
                    </div>
                  )}
                </button>
                <div
                  className={`${
                    showTag ? "" : "hidden"
                  } grid grid-cols-1 space-y-1.5 mt-4 text-xs mb-3 px-3`}
                >
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <div key={index} onClick={onDrawerClose}>
                          <button
                            onClick={() => {
                              router.push({
                                pathname: `/products/search/query/${tag.node.toLowerCase()}`,
                                query: {
                                  graphQuery: tag.node.toLowerCase(),
                                  categoryName: tag.node,
                                },
                              });
                            }}
                          >
                            <p className="font-bold text-base py-1">
                              {tag.node}
                            </p>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="">
                <div className="bg-gray-300 h-[1px] w-full mx-auto"></div>
              </div>

              <div className="py-1">
                <button
                  className="w-full focus:outline-none active:outline-none px-3 py-1"
                  onClick={() => setShowType(!showType)}
                >
                  {showType ? (
                    <div className="flex items-center justify-between">
                      <p className="text-base">閉じる</p>
                      <Close className="h-7 w-7" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-base">商品タイプ</p>
                      <ChevronDown className="h-7 w-7" />
                    </div>
                  )}
                </button>
                <div
                  className={`${
                    showType ? "" : "hidden"
                  } grid grid-cols-1 space-y-1.5 mt-4 text-xs mb-3 px-3`}
                >
                  {types &&
                    types.map((type, index) => {
                      return (
                        <div key={index} onClick={onDrawerClose}>
                          <button
                            onClick={() => {
                              router.push({
                                pathname: `/products/search/query/${type.node.toLowerCase()}`,
                                query: {
                                  graphQuery: type.node.toLowerCase(),
                                  categoryName: type.node,
                                },
                              });
                            }}
                          >
                            <p className="font-bold text-base py-1">
                              {type.node}
                            </p>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="pb-4">
                <div className="bg-gray-300 h-[1px] w-full mx-auto"></div>
              </div>
              <div className="pb-3 mt-3">
                <p className="text-base font-bold">価格帯で選ぶ</p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <Link
                      as={`/products/search/query/${"max-of-price-1000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:<1000)`,
                          categoryName: "1000円以下の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            1000円以下から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link
                      as={`/products/search/query/${"max-of-price-3000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:<3000)`,
                          categoryName: "3000円以下の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            3000円以下から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link
                      as={`/products/search/query/${"max-of-price-35000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:<5000)`,
                          categoryName: "5000円以下の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            5000円以下から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link
                      as={`/products/search/query/${"under-of-price-1000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:>1000)`,
                          categoryName: "1000円以上の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            1000円以上から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link
                      as={`/products/search/query/${"under-of-price-3000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:>3000)`,
                          categoryName: "3000円以上の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            3000円以上から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link
                      as={`/products/search/query/${"under-of-price-5000"}`}
                      href={{
                        pathname: `/products/search/query/[query]`,
                        query: {
                          graphQuery: `(variants.price:>5000)`,
                          categoryName: "5000円以上の商品",
                        },
                      }}
                      passHref
                    >
                      <a>
                        <div
                          onClick={onDrawerClose}
                          className="px-1 py-2 rounded-md shadow-md bg-gray-700"
                        >
                          <p className="text-white text-center">
                            5000円以上から〜
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-span-1 bg-black bg-opacity-70 h-full"
            onClick={onDrawerClose}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Drawer;
