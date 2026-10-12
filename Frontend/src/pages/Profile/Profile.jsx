import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import PersonalInfo from "../../components/profile/PersonalInfo";
import SavedAddresses from "../../components/profile/SavedAddresses";
import AccountMenu from "../../components/profile/AccountMenu";
import LogoutButton from "../../components/profile/LogoutButton";

import EditProfileModal from "../../components/profile/EditProfileModal";
import AddressModal from "../../components/profile/AddressModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import LogoutModal from "../../components/profile/LogoutModal";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [addresses, setAddresses] = useState(() => {
    if (!user?.address) return [];
    return [{ id: "current", ...fromApiAddress(user.address) }];
  });

  // Selected Address
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleProfileSave = async (updatedUser) => {
    const result = await updateProfile(updatedUser);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Profile updated successfully!");
    setIsEditOpen(false);
  };

  const handleAddressSave = async (address) => {
    const result = await updateProfile({ address: toApiAddress(address) });
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    setAddresses([{ id: "current", ...address }]);
    setIsAddressOpen(false);
    setSelectedAddress(null);
  };

  const handlePasswordChange = () => {
    setIsPasswordOpen(false);
  };

  // Logout
  const handleLogout = () => {
    logout();
    setIsLogoutOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        {/* Profile Header */}
        <ProfileHeader user={user} onEdit={() => setIsEditOpen(true)} />

        {/* Orders / Wishlist / Cart / Reviews */}
        <ProfileStats />

        {/* Personal Information */}
        <PersonalInfo
          user={user}
          onEdit={() => setIsEditOpen(true)}
        />

        {/* Saved Addresses */}
        <SavedAddresses
          addresses={addresses}
          onAdd={() => {
            setSelectedAddress(null);
            setIsAddressOpen(true);
          }}
          onEdit={(address) => {
            setSelectedAddress(address);
            setIsAddressOpen(true);
          }}
          onDelete={async () => {
            const result = await updateProfile({ address: null });
            if (!result.success) {
              toast.error(result.message);
              return;
            }
            setAddresses([]);
          }}
        />

        {/* Account Settings */}
        <AccountMenu
          onChangePassword={() => setIsPasswordOpen(true)}
        />

        {/* Logout */}
        <LogoutButton
          onClick={() => setIsLogoutOpen(true)}
        />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        onSave={handleProfileSave}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressOpen}
        onClose={() => {
          setIsAddressOpen(false);
          setSelectedAddress(null);
        }}
        address={selectedAddress}
        onSave={handleAddressSave}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
        onSubmitPassword={handlePasswordChange}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

function fromApiAddress(address) {
  return {
    fullName: address.full_name || "",
    phone: address.phone || "",
    house: address.house || "",
    street: address.street || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    type: address.type || "Home",
    isDefault: address.is_default || false,
  };
}

function toApiAddress(address) {
  return {
    full_name: address.fullName,
    phone: address.phone,
    house: address.house,
    street: address.street,
    landmark: address.landmark,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    type: address.type,
    is_default: address.isDefault,
  };
}