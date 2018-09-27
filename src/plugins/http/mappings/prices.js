export default {
  apis: [
    {
      path: '/calc', // 前端path
      to: '/getQuotation', // 后端path
      method: 'post',
      params: [ // 传入参数转换
        {
          name: 'uniqueKey',
          value: '$resultSerial'
        },
        {
          name: 'skuList',
          value: '$skuItems'
        },
        {
          name: 'checkList',
          value: '$extraItems'
        },
        {
          name: 'detVersion',
          value: '$version',
          default: 'v1.0.0'
        },
        {
          name: '_interface',
          value: 'det_getQuotation'
        }
      ],
      fields: [
        {
          name: 'price',
          from: 'quotation'
        }
      ],
      hooks: {
        afterParams: input => {
          input.login_token = localStorage.getItem('token')
          input.login_user_id = localStorage.getItem('userid')
          input.skuList = input.skuList.map(q => ({
            questionName: q.label,
            questionId: q.id,
            select: q.selected,
            answerList: q.options.map(a => ({
              answerId: a.value,
              answerName: a.label,
              select: a.selected || false
            }))
          }))
          input.checkList = input.checkList.map(q => ({
            questionName: q.label,
            questionId: q.id,
            select: q.selected,
            answerList: q.options.map(a => ({
              answerId: a.value,
              answerName: a.label,
              select: a.selected || false
            }))
          }))
          return input
        }
      }
    }
  ]
}
