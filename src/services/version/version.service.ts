import { Application } from "../../declarations";
import configModelFactory from "../../models/config.model";

export default function (app: Application): void {
  const config = configModelFactory(app);

  
  app.get("/version", async (req: any, res: any) => {
    try {
      const configuration = await config.find().sort({ createdAt: -1 }).limit(1);
      res.json({
        androidVersion: "1.0.0",
        isAndroidUnderMaintenance: false,
        iosVersion: "1.0.0",
        isIosUnderMaintenance: false,
        webVersion: "1.0.0"
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  });
}