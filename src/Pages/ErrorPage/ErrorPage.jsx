import { Link } from "react-router-dom"
import './styles.css'
import giphy from '../../images/giphy.gif'
function ErrorPage() {
    return (
        <div class="container">
      <div class="gif">
        <img src={giphy} alt="gif_ing" />
      </div>
      <div class="content">
        <h1 class="main-heading">404</h1>
        <p>
          the page you're looking for is not found or never existed.
        </p>
        <Link to='/'>
          <button>Back to home </button>
        </Link>
      </div>
    </div>
    )
}

export default ErrorPage