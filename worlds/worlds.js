var worlds = [
  {
    type:"world",
    name:"mundo_carrapato",
    size: [20,20],
    agents:[
      {
        template:"luz",
        name: "luz_1",
        position: [2,5]
      },
      {
        template:"luz",
        name: "luz_2",
        position: [7,5]
      },
      {
        template:"luz",
        name: "luz_3",
        position: [12,5]
      },
      {
        template:"luz",
        name: "luz_4",
        position: [17,5]
      },
      {
        template:"mamifero",
        name: "mamifero_1",
        position: [5,2]
      },
      {
        template:"mamifero",
        name: "mamifero_2",
        position: [15,2]
      },
      {
        template:"carrapato",
        name: "carrapato_1",
        position: [3,18]
      },
      {
        template:"carrapato",
        name: "carrapato_2",
        position: [10,18]
      },
      {
        template:"carrapato",
        name: "carrapato_3",
        position: [17,18]
      }
    ],
    templates:[
      {
        type:"agent",
        name:"carrapato",
        state:{
          color: "#000",
          sangueIngerido: 0
        },
        children:[
          {
            type:"selector",
            children:[
              {
                type: "selector",
                children:[
                  {
                    type:"test",
                    state: "sangueIngerido",
                    op: "==",
                    value: 1,
                    child:{
                      type:"action",
                      act: "change",
                      value:{
                        color: "#ff0000",
                        sangueIngerido:["+",1]
                      }
                    }
                  },
                  {
                    type:"test",
                    state: "sangueIngerido",
                    op: "==",
                    value: 50,
                    child:{
                      type:"action",
                      act: "change",
                      value:{
                        color: "#4373bb",
                        sangueIngerido:["+",1]
                      }
                    }
                  }
                ]
              },
              {
                type:"find",
                template:"mamifero",
                child: {
                  type: "action",
                  act: "change",
                  value: {
                    sangueIngerido:["+",1]
                  }
                }
              },
              {
                type:"find",
                template:"luz",
                child: {
                  type: "action",
                  act: "wait"
                }
              },
              {
                type:"action",
                act:"move",
                value:"random"
              }
            ]
          }
        ]
      },
      {
        type:"agent",
        name:"luz",
        state:{
          color: "#ff0"
        },
        children:[
          {
            type:"action",
            act:"wait"
          }
        ]
      },
      {
        type:"agent",
        name:"mamifero",
        state:{
          color: "#666"
        },
        children:[
          {
            type:"action",
            act:"move",
            value:"random"
          },
          {
            type:"action",
            act:"move",
            value:"right"
          },
          {
            type:"action",
            act:"wait"
          }
        ]
      }
    ]
  },

  {
    type:"world",
    name:"game_of_life",
    size:[20,20],
    agents:[],
    templates:[
      {
        type:"agent",
        name:"celula",
        state:{
          color: "#ccc",
          vivo: 0
        },
        children:[
          {
            type:"selector",
            children:[
              {
                type:"test",
                state:"vivo",
                op:"==",
                value:0,
                child: {
                  type:"count",
                  template:"celula",
                  state:"vivo",
                  opState:"==",
                  stateValue:1,
                  op:"==",
                  value:3,
                  child: {
                    type:"action",
                    act:"change",
                    value: {
                      vivo: 1,
                      color: "#000"
                    }
                  }
                }

              },

              {
                type:"test",
                state:"vivo",
                op:"==",
                value:1,
                child: {
                  type:"selector",
                  children:[
                    {
                      type:"count",
                      template:"celula",
                      state:"vivo",
                      opState:"==",
                      stateValue:1,
                      op:"<",
                      value:2,
                      child: {
                        type:"action",
                        act:"change",
                        value: {
                          vivo: 0,
                          color: "#fff"
                        }
                      }
                    },
                    {
                      type:"count",
                      template:"celula",
                      state:"vivo",
                      opState:"==",
                      stateValue:1,
                      op:">",
                      value:3,
                      child: {
                        type:"action",
                        act:"change",
                        value: {
                          vivo: 0,
                          color: "#fff"
                        }
                      }
                    }

                  ]
                }
              }


            ]//selector.children
          }//selector
        ]//celula.children
      }//celula
    ]//templates
  }//game_of_life
];


for(let x=0;x<worlds[1].size[0];x++){
  for(let y=0;y<worlds[1].size[1];y++){
    worlds[1].agents.push({
      template:"celula",
      name: "celula_"+x+"_"+y,
      position: [x,y]
    });
  }
}


worlds[1].agents[3].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[4].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[5].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[6].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[7].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[8].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[14].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[15].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[16].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[17].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[23].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[24].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[25].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[26].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[27].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[28].state = {
  vivo: 1,
  color: "#000"
};



worlds[1].agents[45].state = {
  vivo: 1,
  color: "#000"
};


worlds[1].agents[48].state = {
  vivo: 1,
  color: "#000"
};

worlds[1].agents[65].state = {
  vivo: 1,
  color: "#000"
};


worlds[1].agents[68].state = {
  vivo: 1,
  color: "#000"
};
