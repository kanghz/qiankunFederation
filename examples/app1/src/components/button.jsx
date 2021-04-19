import React, {useState} from 'react';
import './button.less';
export default function({name, title="提示", content="", ...props}) {
  const [isShow, toggleShow] = useState(false)
  const toggleModel = () => {
    toggleShow(!isShow)
  }
  const hideModel = () => {
    console.log('hide')
    toggleShow(false)
  }
  return (
    <>
      <button onClick={toggleModel} {...props}>{name}</button>
      { isShow &&
        <div className='model' onClick={hideModel}>
          <div className="model-body">
            <div className="title">{title}</div>
            <div className="content">{content}</div>
          </div>
        </div>
      }
    </>
  );
}