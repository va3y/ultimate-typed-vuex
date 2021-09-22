# Vuex 4 Typed Store Boilerplate

A Vuex 4 + Typescript boilerplate that let's you have typechecking with a minimal number of imports:

![](https://i.imgur.com/80dYeuU.png)



The template supports: 

* Vuex modules
* Type checking for payload in commit and dispatch functions
* Separate axios module with cancel token support
* API requests getter to globally handle app loading state 


## What can still be improved

* Automatic payload typing when dispatching action/mutation from another action context. Right now the payload type needs to be manually imported for these cases.

* GenericStore and GenericActionContext types probably could be less cluncky and typed more strictly.

Feel free to contribute! PRs are always welcome


## References


Articles referenced when making:

https://dev.to/shubhadip/vue-3-vuex-4-modules-typescript-2i2o

https://dev.to/3vilarthas/vuex-typescript-m4j

API module originally made by [@chemist-repo](https://github.com/chemist-repo/)