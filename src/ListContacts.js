import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListContacts extends React.Component{
   static propTypes = {
     contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
     removeContact: PropTypes.func.isRequired,
   };

   state={
    query:''
   };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  };

  clearQuery = () => {
    this.updateQuery('')
  };

  render(){
    const { query } = this.state;
    const { contacts, removeContact} = this.props;
    const showingContacts = (query === '')
      ? contacts
      : contacts.filter((c) => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ));

    return (
    <main className='list-contacts'>
      <div className='list-contacts-top'>
        <input
          className='search-contacts'
          type='text'
          placeholder='Search Contacts'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <Link
          to='/create'
          className='add-contact'>
          Add Contact
        </Link>
      </div>
      {showingContacts.length !== contacts.length && (
        <div className='showing-contacts'>
          <span>Now showing {showingContacts.length} of {contacts.length}</span>
          <button onClick={this.clearQuery}>Show all</button>
        </div>
      )}
      <ul className='contact-list'>
        {showingContacts.map(contact => {
          return (
            <li key={contact.id}
                className='contact-list-item'>
              <div className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}>
              </div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={()=>{removeContact(contact.id)}}
                className='contact-remove'>
                Remove
              </button>
            </li>
          )
        })}
      </ul>
    </main>)
  }
}

export default ListContacts;

