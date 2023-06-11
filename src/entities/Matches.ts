import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Team } from "./Teams";

@Entity({ name: "matches" })
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Team, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: "idhost",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_host_id" 
    })
    idhost: Team;

    @ManyToOne((type) => Team, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: "idvisitor",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_visitor_id" 
    })
    idvisitor: Team;

    @Column({ type: 'date', nullable: false })
    date: string;
}
