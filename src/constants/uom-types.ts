import { UomType } from "@prisma/client"

export const UOM_TYPES = [
  {
    id: UomType.pack,
    value: UomType.pack,
    name: "pack"
  },
  {
    id: UomType.m,
    value: UomType.m,
    name: "m"
  },
  {
    id: UomType.set,
    value: UomType.set,
    name: "set"
  },
  {
    id: UomType.box,
    value: UomType.box,
    name: "box"
  },
  {
    id: UomType.ls,
    value: UomType.ls,
    name: "ls"
  },
  {
    id: UomType.tb,
    value: UomType.tb,
    name: "tb"
  },
  {
    id: UomType.sht,
    value: UomType.sht,
    name: "sht"
  },
  {
    id: UomType.lot,
    value: UomType.lot,
    name: "lot"
  },
  {
    id: UomType.roll,
    value: UomType.roll,
    name: "roll"
  },
  {
    id: UomType.other,
    value: UomType.other,
    name: "other"
  },
  {
    id: UomType.service,
    value: UomType.service,
    name: "service"
  }
] as const