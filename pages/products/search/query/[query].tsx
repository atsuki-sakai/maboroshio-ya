import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { generateApiUrl, normalizeProduct } from "@shopify/utils";
import useSWR from "swr";
import { Container, ErrorView, LoadingView } from "@components/ui";
import { ProductCard } from "@components/product";
import { ProductConnection } from "@shopify/shema";
import { motion } from "framer-motion";
import { LoadCircle } from "@components/icon";

const fetchLength = 10;

const ProductQuery = () => {
  const router = useRouter();
  const query = router.query as any;

  const graphQuery = query.graphQuery as string;

  const categoryName: string | undefined = query.categoryName;

  const [cursor, setCursor] = useState("");
  const [prevCursor, setPrevCursor] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const searchQueryProductsApiUrl = generateApiUrl({
    type: "SEARCH_QUERY_PRODUCTS",
  });

  const searchResultLengthApiUrl = generateApiUrl({
    type: "SEARCH_RESULT_LENGTH",
  });
  const searchQueryProductsFetcher = async (
    url: string,
    query: string,
    cursor: string
  ): Promise<ProductConnection> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        query: query,
        cursor: cursor,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        throw Error(e.message);
      });
    return response.data.products;
  };

  const searchResultLengthFetcher = async (
    url: string,
    query: string
  ): Promise<number> => {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        throw Error(e.message);
      });
    return response.data.products.edges.length
      ? response.data.products.edges.length
      : 0;
  };

  const fetchMoreProducts = async () => {
    try {
      setIsFetching(true);
    } catch (e: any) {
      throw Error(e.message);
    } finally {
      setIsFetching(false);
    }
  };

  const { data: productsConnect, error } = useSWR(
    [searchQueryProductsApiUrl, graphQuery, cursor],
    router.isReady ? searchQueryProductsFetcher : null
  );

  const { data: resultLength } = useSWR(
    [searchResultLengthApiUrl, graphQuery],
    router.isReady ? searchResultLengthFetcher : null
  );

  const [pageIndex, setPageIndex] = useState(1);
  const [resultPageLength, setResultPageLength] = useState(
    resultLength && resultLength / fetchLength
  );

  console.log(resultPageLength);

  useEffect(() => {}, [router.isReady]);

  console.log("reload");
  if (error) {
    return <ErrorView message={error.message} />;
  }

  if (!productsConnect) {
    return <LoadingView />;
  }

  if (productsConnect.edges.length === 0) {
    return (
      <Container>
        <div className="px-12 pb-12">
          <div className="py-20">
            {categoryName && (
              <p className="text-lg font-bold">{categoryName}</p>
            )}
            <p className="my-12 text-center text-gray-500">
              検索条件と一致する商品は見つかりませんでした。
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="px-8 mb-12">
        {categoryName && <p className="text-lg font-bold">{categoryName}</p>}
        <div className="w-full flex justify-end mb-4">
          <p className="text-sm">
            <span className="text-lg text-gray-800">{resultLength ?? 0}</span>
            点の商品がヒット
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {productsConnect.edges.map(({ node: product }) => {
            return (
              <ProductCard
                key={product.id}
                product={normalizeProduct(product)}
                productReviewInfo={null}
              />
            );
          })}
        </div>
        <div className="w-full pt-5">
          {
            <div className="mt-8 flex items-center justify-around">
              {prevCursor !== "" ? (
                <button
                  onClick={() => {
                    setCursor(prevCursor!);
                  }}
                >
                  戻る
                </button>
              ) : null}
              <button
                onClick={() => {
                  setPrevCursor(productsConnect.pageInfo.startCursor!);
                  setCursor(productsConnect.pageInfo.endCursor!);
                }}
              >
                次へ
              </button>
            </div>
          }
        </div>
      </div>
    </Container>
  );
};

export default ProductQuery;
