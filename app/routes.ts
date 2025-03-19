import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("beni", "routes/beni.tsx"),
  route("jokes", "routes/jokes.tsx"),
  layout("routes/dashboard.tsx", [
    ...prefix(
      "stupid-prefix", //prefix is very stupid
      [
        route("personal-info/:name", "routes/personal-info.tsx"),
        route("account/:state", "routes/account.tsx"),
      ]
    ),
  ]),
] satisfies RouteConfig;
