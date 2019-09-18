import React from "react";
import { shallow } from "enzyme";

import { Separator } from "../../src";
import { styles } from "../../src/utils/styles";

describe("Separator", () => {
  it("Render without crash", () => {
    const component = shallow(<Separator />);
    expect(component.contains(<div className={styles.separator} />)).toBe(true);
  });
});
