// import { Query } from "./../node_modules/@types/express-serve-static-core/index.d";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
// import cors from "cors";
import express from "express";
async function startServer() {
    const app = express();
    const PORT = Number(process.env.PORT) || 3000;
    app.use(express.json());
    const server = new ApolloServer({
        typeDefs: `#graphql
    type Query{
        getUser:String
    }
`,
        resolvers: {
            Query: {
                getUser: () => "Shahvez",
            },
        },
    });
    await server.start();
    app.get("/", (req, res) => {
        return res.json({ hello: "world" });
    });
    app.use("/graphql", 
    //   cors<cors.CorsRequest>(),
    express.json(), expressMiddleware(server));
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map