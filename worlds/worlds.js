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
        behavior:[
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
        behavior:[
          {
            type:"selector",
            condition:["self:state:color","==","#ff0000"],
            children:[
              {
                type:"action",
                act:"change",
                target:"self",
                value: ["state:color","#fff"]
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value: ["state:color","#ff0000"]
              }
            ]
          }
        ]//behavior
      },//agent
      {
        type:"agent",
        name:"color2",
        state:{
          color: '#ccc'
        },
        behavior:[
          {
            type:"sequence",
            children:[
              {
                type:"action",
                act:"change",
                target:"self",
                value: ["state:color","#000"]
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value: ["state:color","#666"]
              },
              {
                type:"action",
                act:"change",
                target:"self",
                value: ["state:color","#a45df3"]
              }
            ]
          }
        ]//behavior
      }//agent
    ]//templates
  }//world
];
