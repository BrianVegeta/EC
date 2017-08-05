import React from 'react';
import { connect } from 'react-redux';

class OwnerprofileContainer extends React.Component {

  render() {
    const { ownerProfile } = this.props;
    const { items, wishlist, user_profile } = ownerProfile;
    console.log(wishlist);
    if (user_profile == null) {
      return null;
    }
    return (
      <div>
        <div>
          {user_profile.city && user_profile.area &&
            <div>`{user_profile.city}{user_profile.area}`</div>}
          {user_profile.occupation && <div>`{user_profile.occupation}`</div>}
          {user_profile.create_time && <div>`{user_profile.create_time}`</div>}
        </div>
        <div>
          {user_profile.name && <div>`{user_profile.name}`</div>}
          {user_profile.owner_credit && <div>`{user_profile.owner_credit}`</div>}
          {user_profile.website && <div>`{user_profile.website}`</div>}
          {user_profile.autobiography && <div>`{user_profile.autobiography}`</div>}
        </div>
        { items && items.map(item =>
          <div>
            <div>`{item.pname}`</div>
            <div>`{item.price}`</div>
            <div>`{item.favorite_count}`</div>
            <div>`{item.in_my_favorite}`</div>
          </div>,
        )}
        { wishlist && wishlist.map(wish =>
          <div>
            <div>`{wish.pname}`</div>
            <div>`{wish.pname}`</div>
            <div>`{wish.pname}`</div>
          </div>,
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, ownerProfile } = state;
  return { environment, ownerProfile };
};
export default connect(mapStateToProps)(OwnerprofileContainer);
