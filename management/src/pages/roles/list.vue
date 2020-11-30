<template>
	<div>
		<div style="marginBottom: 32px">
			<a-form layout="inline" :model="search" @submit="handleSubmit" @submit.native.prevent>
				<a-form-item label="roleName" name="roleName">
					<a-input v-model:value="search.roleName" placeholder="roleName">
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-button
						type="primary"
						style="marginRight: 16px"
						@click="showModel"
					>
						新增
					</a-button>
					<a-drawer
						:title="title"
						placement="right"
						:closable="true"
						v-model:visible="visible"
						:after-visible-change="afterVisibleChange"
					>
						<a-form :model="form" ref="ruleForm" :rules="rules">
							<a-form-item label="用户名" name="name">
								<a-input v-model:value="form.name" />
							</a-form-item>
              <a-form-item label="描述" name="description">
								<a-input v-model:value="form.description" />
							</a-form-item>
							<a-form-item :wrapper-col="{ span: 24, offset: 0 }">
								<a-button type="primary" @click="onSubmit">
									确定
								</a-button>
								<a-button style="margin-left: 10px;" @click="resetForm">
									取消
								</a-button>
							</a-form-item>
						</a-form>
					</a-drawer>
					<a-button
						type="primary"
						html-type="submit"
					>
						搜索
					</a-button>
				</a-form-item>
			</a-form>
		</div>
		<div>
			<a-table 
			:columns="columns" 
			:data-source="data" 
			:pagination="pagination" 
			:loading="loading"
			:row-key="(record) => record.id"
    	@change="handleTableChange">
				<template #status="{record}">
					<span v-if="record.status" style="color: green">
						正常
					</span>
					<span v-else style="color: red">
						禁用
					</span>
				</template>
				<template #roles="{text}">
					{{text}}
				</template>
				<template #operation="{record}">
          <span class="table-operation">
            <a style="marginRight: 10px" @click="updateUser(record)">编辑</a>
						<a style="marginRight: 10px" @click="updateStatus(record)" v-if="record.status">禁用</a>
						<a style="marginRight: 10px" @click="updateStatus(record)" v-else>启用</a>
						<a @click="deleteUser(record)">删除</a>
          </span>
        </template>
			</a-table>
		</div>
	</div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import roleMgr from '/@/http/role'
import menuMgr from '/@/http/menu'
let validateRoles = async (rule, value) => {
	if (value.length === 0) {
		return Promise.reject('请选择角色');
	} else {
		return Promise.resolve();
	}
};
export default {
	components: {
		UserOutlined,
    LockOutlined,
	},
	data() {
		return {
			data: [],
			title: '新增用户',
			curId: null,
			visible: false,
			search: {
        roleName: '',
			},
			form: {
				description:"",
				name:"",
			},
			columns: [
        {
					title: "name",
					dataIndex: "name",
					key: "name",
				},
				{
					title: "description",
					dataIndex: "description",
					key: "description",
				},
				{
					title: "status",
					key: "status",
					slots: { customRender: "status" },
				},
				{
					title: "createTime",
					dataIndex: "createTime",
					key: "createTime",
					slots: { customRender: "createTime" },
				},
				{
					title: "updateTime",
					dataIndex: "updateTime",
					key: "createTime",
					slots: { customRender: "createTime" },
				},
				{
					title: 'Action',
					dataIndex: 'operation',
					key: 'operation',
					slots: { customRender: 'operation' },
				},
			],
			pagination: {
				current: 1,
				pageSize: 5
			},
			loading: false,
			rules: {
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
				],
				name: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
				],
      },
		};
	},
	created() {
		this.fetch({
			pageNum: 1,
			pageSize: 5
		})
	},
	methods: {
		handleChange(value) {
      console.log(`selected ${value}`);
    },
		handleSubmit(e) {
			if (this.search.name === '') {
				this.fetch({
					pageNum: 1,
					pageSize: 5
				})
			}
			this.fetch(this.search,{
				pageNum: 1,
				pageSize: 5
			})
		},
		deleteUser(row) {
			let params = {
				url: `${roleMgr.delRole.url}/${row.id}`,
				data: {}
			}
			this.$axios.delete(params.url,params.data).then(res=>{
				console.log('删除成功')
				this.fetch({
					pageNum: 1,
					pageSize: 5
				})
			}).catch(err=> {
				console.log('删除失败')
			})
		},
		updateStatus(row) {
			let params = {
				url: `${roleMgr.updateStatus.url}`,
				data: {
					id: row.id,
					status: !row.status
				}
			}
			this.$axios.put(params.url,params.data).then(res=>{
				console.log('修改状态成功')
				this.fetch({
					pageNum: 1,
					pageSize: 5
				})
			}).catch(err=> {
				console.log('修改状态失败')
			})
		},
		onSubmit() {
			let params = {
				url: roleMgr.createRole.url,
				data: {
					description:this.form.description,
					name:this.form.name,
				}
			}
			this.$refs.ruleForm
        .validate()
        .then(() => {
					if (this.title === '新增角色') {
						this.$axios.post(params.url,params.data).then(res=>{
							console.log('新增成功')
							this.visible = false;
							this.fetch({
								pageNum: 1,
								pageSize: 5
							})
						}).catch(err=> {
							console.log('新增角色')
						})
					} else if (this.title === '编辑用户') {
            params.data.id = this.curId;
            params.url = roleMgr.updateRole.url
						this.$axios.put(params.url,params.data).then(res=>{
							console.log('编辑成功')
							this.visible = false;
							this.fetch({
								pageNum: 1,
								pageSize: 5
							})
						}).catch(err=> {
							console.log('编辑失败')
						})
					}
        }).catch(error => {
          console.log('error', error);
				});
		},
		showModel() {
			this.visible = true; 
			this.title='新增角色';
			this.form = {
				description:"",
				name:"",
			}
		},
		updateUser(row) {
			this.visible = true;
			this.title = '编辑角色';
			this.form = row;
			this.curId = row.id;
		},
		resetForm() {
			this.visible = false;
      this.$refs.ruleForm.resetFields();
    },
		afterVisibleChange(val) {
      console.log('visible', val);
    },
		handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch(params = {}) {
      console.log('params:', params);
      this.loading = true;
      this.$axios.get(roleMgr.roleList.url,{params}).then(data => {
        const pagination = { ...this.pagination };
        pagination.total = data.data._meta.totalCount;
        this.loading = false;
        this.data = data.data.items.map((item, key)=>{
					return {
						...item,
						key
					}
				});
        this.pagination = pagination;
      });
    },
	},
		
};
</script>

<style lang="scss">
	.ant-drawer-content-wrapper {
		width: 390px!important;
		.ant-form-item-control-wrapper {
			width: 80%;
		}
	}
</style>
