import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';


const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #CECECE;
`;

const DropedContainer = styled.div`
  ${props => `background: url(${props.imageSrc});`}
  positon: relative;
  width: 100%;
  height: 100%;
`;

class ImageContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      imageSrc: null,
    };
  }

  onDrop(images) {
    this.setState({ imageSrc: images[0].preview });
    console.log(images);
  }

  render() {
    const { imageSrc } = this.state;
    return (
      <Container >
        {imageSrc &&
          <DropedContainer imageSrc={imageSrc} >
            <Dropzone
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              multiple={false}
              accept="image/jpeg, image/png"
              onDrop={this.onDrop}
            />
          </DropedContainer>
        }
        {!imageSrc &&
          <Dropzone
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            multiple={false}
            accept="image/jpeg, image/png"
            onDrop={this.onDrop}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { image } = state;
  return { image };
};
export default connect(mapStateToProps)(ImageContainer);
