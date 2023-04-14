import { request } from "../common/request";
import { IResponse } from "../common/types";
import { ITheme } from "./model";

class ThemeController {
  async getLabels() {
    try {
      const themeLabels = await request.get<IResponse<ITheme>>('theme');
      return themeLabels.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const themeController = new ThemeController();
export default themeController;