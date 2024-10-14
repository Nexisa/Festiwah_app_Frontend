/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\components\SearchComponent` | `/..\components\UserInfo` | `/Language` | `/Preferences` | `/Settings` | `/_sitemap` | `/admin/dashboard` | `/auth/login` | `/auth/signup` | `/screens/follower` | `/tabs` | `/tabs/explore` | `/tabs/language` | `/user` | `/user/` | `/user/comment` | `/user/notify` | `/user/plus` | `/user/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
