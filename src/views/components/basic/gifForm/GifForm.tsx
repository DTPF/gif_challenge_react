import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MyGifsContext from 'context/mygifs/MyGifsContext';
import { getCategoriesNameApi } from 'api/category.api';
import { Gif } from 'interfaces/gif';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Button, Form, Image, Input, Select, Switch, Upload, message } from 'antd'
import TitleH1 from '../titleH1/TitleH1';

export default function GifForm() {
	const { gifId } = useParams()
	const { gifs, postGif, updateGif } = useContext(MyGifsContext)
	const [messageApi, contextHolder] = message.useMessage()
	const [categories, setCategories] = useState([])
	const findGif: any = gifs.find((gif: Gif) => gif._id === gifId)
	const navigate = useNavigate()
	const [input, setInput] = useState(true);
	const categoriesOptions: SelectProps['options'] = [];

	useEffect(() => {
		let isMounted = true
		const getCategoriesFetch = async () => {
			const response = await getCategoriesNameApi()
			if (response.status === 200) {
				setCategories(response.result)
			} else {
				message.error('Something wrong')
			}
		}
		isMounted && getCategoriesFetch()
		return () => { isMounted = false }
	}, [])

	categories.forEach((track: any) => {
		categoriesOptions.push({
			label: track.name,
			value: track._id,
		});
	});

	return (
		<div >
			{contextHolder}
			<TitleH1 title={`${gifId ? `Update '${findGif.name}'` : 'Create'} Gif`} />
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}
				initialValues={{ remember: true }}
				onFinish={(values) => !gifId ? postGif(values, messageApi) : updateGif(findGif._id, values, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Gif name"
					name="name"
					rules={[{ required: !gifId ? true : false, message: 'Please input playlist name!' }]}
				>
					<Input placeholder='Introduce track name' defaultValue={findGif?.name} size="large" />
				</Form.Item>

				<Form.Item
					label="Categories"
					name="categories"
				>
					<Select
						mode="multiple"
						placeholder="Select categories"
						defaultValue={findGif?.categories}
						options={categoriesOptions}
						optionFilterProp='label'
						size="large"
					/>
				</Form.Item>

				<Switch
					checked={input}
					checkedChildren="Image"
					unCheckedChildren="Url"
					onChange={() => {
						setInput(!input);
					}}
					style={{ paddingTop: input ? 5 : 5 }}
				/>
				{!input ? (
					<Form.Item
						label="External Image"
						name="externalImage"
						rules={[{ required: !gifId ? true : false, message: 'Please upload an image!' }]}
					>
						<Input name='external-gif' placeholder='Introduce external url' defaultValue={findGif?.externalImageUrl} />
					</Form.Item>
				) : (
					<Form.Item
						label="Image"
						name="image"
						rules={[{ required: !gifId ? true : false, message: 'Please upload an image!' }]}
					>
						<Upload
							name="gif"
							listType="picture-card"
							maxCount={1}
							showUploadList={true}
							style={{ marginTop: 20 }}
						>
							Upload Gif
						</Upload>
					</Form.Item>
				)}
				<div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 15 }}>
					<Image
						width={400}
						src={findGif?.imageUrl}
					/>
				</div>
				<Form.Item style={{ textAlign: 'center', margin: '0 auto' }}>
					<Button onClick={() => navigate(-1)} type='text' style={{ marginRight: 20 }}>
						<ArrowLeftOutlined /> Go back
					</Button>
					<Button type="primary" htmlType="submit">
						{gifId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
