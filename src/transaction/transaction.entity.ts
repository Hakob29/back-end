import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Entity, ManyToOne } from "typeorm";


@Entity('Transaction')
export class TransactionEntity extends Base {

    @ManyToOne(() => UserEntity, (user) => user.transactions)
    recipient: UserEntity

}