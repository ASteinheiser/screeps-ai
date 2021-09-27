interface _Creep extends Creep {
  memory: CreepMemory;
}

interface CreepMemory extends Memory {
  role: string;
  building?: boolean;
}
