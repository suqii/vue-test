<template>
  <div class="hello">
   <div class="custom-tree-container">
  <div class="block">
    <p>使用 render-content</p>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      :render-content="renderContent">
    </el-tree>
  </div>
  <div class="block">
    <p>使用 scoped slot</p>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</div>
  </div>
</template>

<script>
 let id = 1000;
export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data))
      }
    },
    mounted() {
      console.log(this.data);
      console.log(this.returnChildren(this.data[0]));
    },
    methods: {
handleNodeClick(node, data){
  console.log('click');
  console.log(node);
  console.log(data);
},
      // 返回字节点
      returnChildren(data) {
        // data.forEach(item => {
        //   if (item.children) {
        //     this.returnChildren(item.children);
        //   }
        // });
        return data.children;
      },

      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        console.log(data) 
        console.log(newChild)
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        // console.log(parent.data.children)
        // console.log(parent.data)
        const children = parent.data.children || parent.data;
        // console.log(children)
        const index = children.findIndex(d => d.id === data.id);
        console.log(children[index].id)
        // children.splice(index, 1);
        // console.log(data);
        // console.log(node);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

.el-tree-node.is-current > .el-tree-node__content {
  background-color: red !important;
}
  </style>
