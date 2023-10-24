export const overlay = {
  enter:"ease-out duration-300",
  enterFrom:"opacity-0",
  enterTo:"opacity-100",
  leave:"ease-in duration-200",
  leaveFrom:"opacity-100",
  leaveTo:"opacity-0"
}

export const scale = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95"
}

export const translateY = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1"
}

export const tranlateX = {
  enter: "transform transition ease-in-out duration-700",
  enterFrom: "translate-x-full opacity-0",
  enterTo: "translate-x-0 opacity-1",
  leave: "transform transition ease-in-out duration-700",
  leaveFrom: "translate-x-0 opacity-1",
  leaveTo: "translate-x-full opacity-0"
}