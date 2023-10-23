# Ignite_Fleet

Projeto 6 - Login social, Realm DB e Geolocalização

## install libs

npm install

npx expo install

## build project

npx expo run:android

## build cleaned cach

npx expo start --clear

## When modify native code

npx expo prebuild

## interestings things

- Have a generator method to create a realm object
- Can to define fields odd schema you use to search an object
- There are realms hooks to use for do the operations
- Realm behaviors with trsactions, if get error, realm doesn't save anything
- Realm is orientaded an object
- Use refferencies
- Use state?. to indicates this state can be undefined
- Use state!.to indicates this state will be used
- Use Listener in the states
- In types, use more types for one state
- Works with Realm to login follows
- Works with Regex
- Sync with Atlas Mongo DB, good to see user local DB
- Sync works when turn on online, analysing status device
- Realm returns the percentage synced
