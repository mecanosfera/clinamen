var worlds = [
  {
    type:"world",
    name:"teste1",
    size:[40,25],
    generation:0,
    agents:[
      {
        template:"static",
        position:[4,8]
      },
      {
        template:"color",
        name: "color_1",
        position: [10,6]
      },
      {
        template:"color",
        name: "color_2",
        position: [15,8]
      },
      {
        template:"color2",
        name: "color_3x",
        position: [2,17]
      }
    ],
    templates:[
      {
        type:"agent",
        name:"static",
        state:{
          color:"#ff0000"
        },
        children:[
          {
            type:"action",
            act:"wait",
            target:"self"
          }
        ]
      },
      {
        type:"agent",
        name:"color",
        state:{
          color: '#ff0'
        },
        children:[
          {
            type:"selector",
            condition:[{
                agent:{target:"self",state:"color"}
              },"==","#ff0000"],
            children:[
              {
                type:"action",
                act:"change",
                target:"self",
                value:{
                  color: "#fff"
                }
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value: {
                  color: "#ff0000"
                }
              }
            ]
          }
        ]//children
      },//agent
      {
        type:"agent",
        name:"color2",
        state:{
          color: '#ccc'
        },
        children:[
          {
            type:"sequence",
            children:[
              {
                type:"action",
                act:"change",
                target:"self",
                value: {
                  color: "#000"
                }
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value:  {
                  color: "#666"
                }
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value:  {
                  color: "#a45df3"
                }
              }
            ]
          }
        ]//children
      }//agent
    ]//templates
  },//world,
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
          sobreMamifero: false,
          sangueIngerido: 0
        },
        children:[
          {
            type:"selector",
            children:[
              {
                type:"action",
                condition: [{
                    agent:{target:"self",state:"sangueIngerido"}
                  },"==",50],
                target: "self",
                act:"change",
                value: {
                  color: "#ff0000",
                  sangueIngerido:["+",1]
                }
              },
              {
                type:"action",
                condition: [{
                    agent:{target:"self",state:"sobreMamifero"}
                  },"==",true],
                target: "self",
                act:"change",
                value: {
                  sangueIngerido:["+",1]
                }
              },
              {
                type:"action",
                condition: [
                  [{
                    agent:{target:"self",state:"sobreMamifero"}
                  },"==",false],
                  "and",
                  [{
                    search:{type:"distance",filter:"closest"},
                    agent:{template:"mamifero"}
                  },"<=",2]
                ],
                target:"self",
                act:"change",
                value: {
                  sobreMamifero: true,
                  color: "#ff0"
                }
              },
              {
                type:"action",
                condition: [
                  [
                    [{
                      agent:{target:"self",state:"sobreMamifero"}
                    },"==",false],
                    "and",
                    [{
                      search:{type:"distance",filter:"closest"},
                      agent:{template:"luz"}
                    },"<=",2]
                  ],
                  "and",
                  [{
                    search:{type:"distance",filter:"closest"},
                    agent:{template:"mamifero"}
                  },">",2]
                ],
                target: {
                  search:{type:"distance",filter:"closest"},
                  agent:{template:"mamifero"}
                },
                act:"move"
              },
              {
                type:"action",
                condition: [
                  [{
                    agent:{target:"self",state:"sobreMamifero"}
                  },"==",false],
                  "and",
                  [{
                    search:{type:"distance",filter:"closest"},
                    agent:{template:"luz"}},
                    ">",2]
                ],
                target: {
                  search:{type:"distance",filter:"closest"},
                  agent:{template:"mamifero"}
                },
                act:"move"
              },
              {
                type:"action",
                target: "self",
                act: "wait"
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
            target:"self",
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
            target:"self",
            act:"wait"
          }
        ]
      }//mamifero
    ]//templates
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
                type:"action",
                condition:[
                  [{
                    agent:{target:"self",state:"vivo"}
                  },"==",0],
                  "and",
                  [{
                      search:{type:"total",filter:{radius:1}},
                      agent:{template:"celula",state:"vivo",value:1}
                    },">=",2]
                ],
                act:"change",
                value: {
                  vivo: 1,
                  color: "#000"
                }
              },
              {
                type:"action",
                condition:[
                  [{
                    agent:{target:"self",state:"vivo"}
                  },"==",0],
                  "and",
                  [
                    [{
                      search:{type:"total",filter:{radius:1}},
                      agent:{template:"celula",state:"vivo",value:1}
                    },"<",2],
                    "or",
                    [{
                      search:{type:"total",filter:{radius:1}},
                      agent:{template:"celula",state:"vivo",value:1}
                    },">",3]
                  ]
                ],
                act:"change",
                value: {
                  vivo: 0,
                  color: "#fff"
                }
              },
            ]
          }
        ]
      }//celula
    ]//templates
  }//game_of_life
];


for(let x=0;x<worlds[2].size[0];x++){
  for(let y=0;y<worlds[2].size[1];y++){
    worlds[2].agents.push({
      template:"celula",
      name: "celula_"+x+"_"+y,
      position: [x,y]
    });
  }
}

/*
{
  type:"action",
  act:"change",
  target:"self",
  value: ["state:color","#a45df3"]
}

target: carrapato:state:grudado

*/
