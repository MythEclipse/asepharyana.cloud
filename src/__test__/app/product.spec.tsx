import ProductPage from "@/app/product/page";
import { render } from "@testing-library/react";
import { describe, it } from "node:test";

import { expect } from "@jest/globals";

describe("ProductPage", () => {
  it("should render the product page", () => {
    const page = render(
      <ProductPage
        params={{
          slug: [],
        }}
      />,
    );
    expect(page).toMatchSnapshot();
  });
});
