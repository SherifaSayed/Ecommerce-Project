import { Query, Resolver } from "@nestjs/graphql";


@Resolver()
export class OrderResolver {


    @Query(() => String, { name: 'RootQueryResolver', description: 'test desc' })
    rootQueryResolver() {
        return 'test'
    }
@Query(() => Number, { name: "RootQueryNumber" , description:'return number'})
    rootQueryNumber() {return 23}
}