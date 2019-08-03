import * as React from 'react';
import { Modal, Form, Row, Input, Select } from 'component/antd';
import { modal } from 'store/modal';

const topicFormItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 11,
  },
};

const bussDesc = `概要描述Topic的数据源, Topic数据的生产者/消费者, Topic的申请原因及备注信息等。
例如:
  数据源：采集odin节点
  生产消费方：agent生产/dsink消费
  申请原因及备注：数据入es进行检索
  最多140个字"`;

class Topic extends React.Component<any> {
  public handleSubmit = () => {
    debugger
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.props;
    return (
      <Modal
        title="Topic 申请"
        style={{ top: 70 }}
        visible={true}
        onCancel={modal.close}
        maskClosable={false}
        width="50%"
        destroyOnClose={true}
        okText="确定"
        cancelText="取消"
        onOk={this.handleSubmit}
      >
        <Form {...topicFormItemLayout} >
          <Row>
            <Form.Item
              label="Topic 名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入Topic 名称' }],
              })(
                <Input
                  placeholder="请输入Topic 名称"
                  disabled={disabled}
                />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="集群名称"
            >
              {getFieldDecorator('cluster', {
                rules: [{ required: true, message: '请选择集群' }],
              })(
                <Select />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="负责人"
            >
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请输入负责人' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="保存时间"
            >
              {getFieldDecorator('save_time', {
                rules: [{ required: true, message: '请输入保存时间' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="预估每秒峰值流量"
            >
              {getFieldDecorator('flowPerSecond', {
                rules: [{ required: true, message: '请输入预估每秒峰值流量' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="分区数"
            >
              {getFieldDecorator('partition_num', {
                rules: [{ required: true, message: '请输入分区数' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="副本数"
            >
              {getFieldDecorator('copy_num', {
                rules: [{ required: true, message: '请输入分区数' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="业务说明"
            >
              {getFieldDecorator('buss_desc', {
                rules: [{ required: true, message: '请输入业务说明' }],
              })(
                <Input.TextArea placeholder={bussDesc} style={{ height: 150 }}/>,
              )}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'topic' })(Topic);
