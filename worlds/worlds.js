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
  }
];
