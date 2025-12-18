# Adding a Profile

As of now, Vahrplan supports only apis, which can be used with [`hafas-client`](https://github.com/public-transport/hafas-client)-like api clients using the [`friendly-public-transport-format`](https://github.com/public-transport/friendly-public-transport-format) (FPTF). To implement a profile using `hafas-client`, follow the steps below.

## Choose a Profile

Choose the profile you would like to implement from [this list](https://github.com/public-transport/hafas-client/blob/main/p/readme.md#built-in-profiles). The `profile name` listed there is what we will refer to as the "profile id".

## Add the Profile Id to the ProfileId Type

Add the profile id of the new profile to the array in [/src/params/profileId.ts](/src/params/profileId.ts).

## Implement the Profile Class

Implement [the abstract profile class](/src/lib/server/profiles/profile.ts) in [/src/params/profileId.ts](/src/lib/server/profiles/profile-implementations). You can use [the BVG profile](/src/lib/server/profiles/profile-implementations/bvgProfile.ts) as a guidance. Some further hints:

### Products

In the constructor parameters of `FptfDataService`, which you will use as the `journeyDataService`, you will need to map each product id of Vahrplan to a product id of the hafas profile. You can find a list of the latter at `https://github.com/public-transport/hafas-client/blob/main/p/<your profile>/products.js` replacing `<your profile>` with the profile id. In case you are unsure how the products should be mapped, the table below explains what each product should represent.

| product id            | explanation                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `longDistanceExpress` | primary long distance trains like German ICE or French TGV.                                                             |
| `longDistance`        | other long distance train. Choose `longDistanceExpress` instead if the upstream api has only one long distance product. |
| `regionalExpress`     | faster regional trains. Choose `regional` instead if the upstream api has only one regional product.                    |
| `regional`            | regular regional trains                                                                                                 |
| `suburban`            | trains connecting suburbs to centres of large cities similar to [German S-Bahns](https://en.wikipedia.org/wiki/S-Bahn). |
| `subway`              | subways                                                                                                                 |
| `tram`                | trams                                                                                                                   |
| `bus`                 | busses                                                                                                                  |
| `taxi`                | (bus) services you need to request in advance in order to get a ride.                                                   |
| `ferry`               | everything on water                                                                                                     |

### Options

You can use `FptfOptionId` for the `OptionT` generic, since all profiles from `hafas-client` should support the options listed there.

### Line Shape Parser

This is for nice looking colorful icons. You can either create an instance of `ScopedHafasClientLineShapeParser` or create a custom class extending `ScopedHafasClientLineShapeParser` depending on how many special cases you can/want to handle.

## Add to Registry

Add your profile to the object in [/src/lib/server/profiles/profileRegistry.ts](/src/lib/server/profiles/profileRegistry.ts).
