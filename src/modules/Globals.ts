import { TypeResolver } from "./TypeResolvers";
import * as KontentDelivery from "@kentico/kontent-delivery";


export default class Globals {
    static PROJECT_ID: string = "6c08ae22-aaba-00c5-2884-7221a976fac0";

    static SECURE_API_KEY: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmRmMzE3NGJlYTU0ODI3YTBkODZmZDNkM2RjMjliNyIsImlhdCI6MTczMzEyODIwMCwibmJmIjoxNzMzMTI4MjAwLCJleHAiOjE4Mjc3MzYxNDAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiI3ZjUzZjU5ZGZmZmE0Njg4OGQxY2ZjOTY1ODdmZjc5YyIsInByb2plY3RfY29udGFpbmVyX2lkIjoiMDhiZDI2NmRlODRmMDA3NTNkZDdlYWRlZWNmMGE5ZDkiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.fz6Iv6IBMlIYbbGIV4kbR6amNeO64Y6fE77kFcrl0rg";
  
    static KontentClient: any = new KontentDelivery.DeliveryClient({
        projectId: Globals.PROJECT_ID,
        globalQueryConfig: {
            useSecuredMode: true, // Queries the Delivery API using secure access.
        },
        secureApiKey: Globals.SECURE_API_KEY,
        typeResolvers: TypeResolver,

    });

    static SITE_NAME = "IPS Congress";


    static CURRENT_LANG_CODENAME: string = "default";

    static LANG_COOKIE: string = "0cd50f-lang-cookie";

    static BASE_URL: string =
        process.env.NODE_ENV === "production"
            ? "https://strategic-v2-omega.vercel.app/"
            : "http://localhost:3000/";
}